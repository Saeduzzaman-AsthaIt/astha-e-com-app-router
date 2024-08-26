import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <Link href={`/sets`}>
        <Button>
          Go to Sets
        </Button>
      </Link>
    </div>
  );
}