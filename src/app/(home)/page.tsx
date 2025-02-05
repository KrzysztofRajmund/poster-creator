import { PosterBox, PosterController } from "@/components";
import { PosterProvider } from "@/context";

export default function Home() {
  return (
    <main className="m-[66px] flex h-full flex-wrap-reverse justify-center gap-[24px]">
      <PosterProvider>
        <PosterBox />
        <PosterController />
      </PosterProvider>
    </main>
  );
}
