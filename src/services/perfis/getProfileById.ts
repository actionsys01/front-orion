import api from "@services/api";

export default async function getProfileById(profileId : number) {
    const response = await api.get(`/perfil/search/${profileId}`)

    return response
}