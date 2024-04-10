"use client";

import EmployeeIdParser from "@/core/parsers/employeeId.parser";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { useUpdateEmployeeById } from "@/domain/hooks/useUpdateEmployeeById.hook";
import { UpdateEmployeeDataSchema } from "@/domain/params/employee.param";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

export default function EditEmployeePage() {
  const { employeeId }: { employeeId: string } = useParams();
  const id = useMemo(() => EmployeeIdParser.parse(employeeId), [employeeId]);
  const { data } = useGetEmployeeById({ id });
  const { mutate, isPending } = useUpdateEmployeeById({ id });
  const [name, setName] = useState<string | undefined>();
  const [salary, setSalary] = useState<number | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [profileImage, setProfileImage] = useState<string | undefined>();

  useEffect(() => {
    if (!data) {
      return;
    }
    setName(data.employee_name);
    setSalary(data.employee_salary);
    setAge(data.employee_age);
    setProfileImage(data.profile_image);
  }, [data]);

  if (!data) {
    return <>Error: Too many requests</>;
  }
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = UpdateEmployeeDataSchema.parse({
      name,
      salary,
      age,
      profile_image: profileImage,
    });
    mutate(params);
  };

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <form className="flex flex-col gap-4 items-start" onSubmit={onSubmit}>
        <h2>Edit Employee</h2>
        <input
          className="p-2 text-black"
          name="name"
          type="text"
          placeholder="Name"
          value={name ?? ""}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="p-2 text-black"
          name="salary"
          type="number"
          placeholder="Salary"
          value={salary ?? -1}
          onChange={(event) => setSalary(parseInt(event.target.value))}
        />
        <input
          className="p-2 text-black"
          name="age"
          type="number"
          placeholder="Age"
          value={age ?? -1}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
        <input
          className="p-2 text-black"
          name="profile_image"
          type="text"
          placeholder="Profile image"
          value={profileImage ?? ""}
          onChange={(event) => setProfileImage(event.target.value)}
        />
        <button
          className="border px-2 py-1 rounded-md"
          style={{ opacity: isPending ? 0.5 : 1 }}
          disabled={isPending}
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </main>
  );
}
