import { PosterBox, PosterController } from "@/components";
import { PosterProvider } from "@/context";

export default function Home() {
  return (
    <main className="m-[66px] flex h-full justify-center gap-x-[24px]">
      <PosterProvider>
        <PosterBox />
        <PosterController />
      </PosterProvider>
    </main>
  );
}
