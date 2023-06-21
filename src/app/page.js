import Image from "next/image";
import hi from "../../public/vercel.svg";
export default function Home() {
  return (
    <main>
      <Image className="cover" src={hi} />
    </main>
  );
}
