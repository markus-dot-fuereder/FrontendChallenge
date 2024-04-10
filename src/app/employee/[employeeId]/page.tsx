"use client";

import EmployeeIdParser from "@/core/parsers/employeeId.parser";
import { useDeleteEmployeeById } from "@/domain/hooks/useDeleteEmployeeById.hook";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function EmployeeDetailPage() {
  const router = useRouter();
  const { employeeId }: { employeeId: string } = useParams();
  const id = useMemo(() => EmployeeIdParser.parse(employeeId), [employeeId]);
  const { data } = useGetEmployeeById({ id });
  const { mutate, isPending } = useDeleteEmployeeById({ id });
  const [hasError, setHasError] = useState(false);

  if (!data) {
    return <>Error: Too many requests</>;
  }

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee Details</h1>
      <EmployeeCard employee={data} />
      <div className="flex gap-2">
        <Link
          className="border px-2 py-1 rounded-md"
          href={`/employee/${id}/edit`}
        >
          Edit
        </Link>
        <button
          className="border px-2 py-1 rounded-md"
          style={{ opacity: isPending ? 0.5 : 1 }}
          disabled={isPending}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setHasError(false);
            mutate(undefined, {
              onSuccess: () => {
                router.push("/");
              },
              onError: () => {
                setHasError(true);
              },
            });
          }}
        >
          {isPending ? "DELETING" : "DELETE"}
        </button>
      </div>
      {hasError && (
        <span className="text-red-500">
          Error, probably oo many requests sent to API
        </span>
      )}
    </main>
  );
}
