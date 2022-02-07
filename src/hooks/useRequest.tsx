import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import api from '../services/api';
import { useSession } from 'next-auth/client';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
    extends Pick<
        SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
        'isValidating' | 'revalidate' | 'error' | 'mutate'
    > {
    data: Data | undefined;
    response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
    extends Omit<
        SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
        'initialData'
    > {
    initialData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
    request: GetRequest,
    { initialData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
    const [session] = useSession();

    const {
        data: response,
        error,
        isValidating,
        revalidate,
        mutate,
    } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
        request && JSON.stringify(request),
        /**
         * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
         * function is actually only called by `useSWR` when it isn't.
         */
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        () => api(request!),
        {
            ...config,
            refreshInterval: 1000,
            refreshWhenOffline: true,
            refreshWhenHidden: true,
            initialData: initialData && {
                status: 200,
                statusText: 'InitialData',
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                config: request!,
                headers: {
                    Authorization: `Bearer ${session?.token}`, //
                },
                data: request?.data,
            },
        },
    );

    return {
        data: response && response.data,
        response,
        error,
        isValidating,
        revalidate,
        mutate,
    };
}
