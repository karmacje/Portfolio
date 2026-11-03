import Image from "next/image";

export default function ProfileCard() {
  return (
    <figure className="profile">
      <Image src="/Profile.JPG" alt="Portrait of Karley Valmores" width={580} height={580} priority sizes="(max-width: 700px) 100vw, 40vw" />
      <figcaption>Karl Mc Jay G. Valmores</figcaption>
    </figure>
  );
}
