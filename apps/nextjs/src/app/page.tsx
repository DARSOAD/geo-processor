import { Button, HStack } from "@chakra-ui/react"
import Link from 'next/link';

export default function Home() {
  return (
    <HStack>
      <Link className="underline" href="/geo">
        <Button>Go to geo</Button>
      </Link>
    </HStack>
  );
}
