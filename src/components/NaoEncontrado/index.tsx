import { Grid, Image, Spacer, Text } from '@geist-ui/react';

export default function NaoEncontrado() {
    return (
        <Grid.Container direction="column" justify="center" alignItems="center">
            <Text p>Nenhum registro encontrado</Text>
            <Image
                height={300}
                src="/assets/images/nao-encontrado.svg"
                width={400}
            />
        </Grid.Container>
    );
}
