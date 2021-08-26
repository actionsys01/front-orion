import { useTheme } from "@geist-ui/react";
import { ArrowLeftCircle } from "@geist-ui/react-icons";
import { useRouter } from "next/router";

export default function BotaoVoltar() {
  const { palette } = useTheme();
  const router = useRouter();

  return (
    <a onClick={() => router.back()}>
      <ArrowLeftCircle color={palette.secondary} />
    </a>
  );
}
