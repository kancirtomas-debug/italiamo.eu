import Image from "next/image";

export function Logo({
  className = "",
  dark = false,
  priority = false,
}: {
  className?: string;
  dark?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/italiamo-logo-official.png"
      alt="Italiamo Distribution"
      width={201}
      height={53}
      priority={priority}
      className={`h-9 w-auto sm:h-10 lg:h-10 ${dark ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
