"use client";

import { useCreateEmployeeById } from "@/domain/hooks/useCreateEmployeeById.hook";
import { CreateEmployeeDataSchema } from "@/domain/params/employee.param";
import { FormEvent, useState } from "react";

export default function EditEmployeePage() {
  const { mutate, isPending } = useCreateEmployeeById();
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [age, setAge] = useState(0);
  const [profileImage, setProfileImage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = CreateEmployeeDataSchema.parse({
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
        <h2>Create Employee</h2>
        <input
          className="p-2 text-black"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="p-2 text-black"
          name="salary"
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(event) => setSalary(parseInt(event.target.value))}
        />
        <input
          className="p-2 text-black"
          name="age"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
        <input
          className="p-2 text-black"
          name="profile_image"
          type="text"
          placeholder="Profile image"
          value={profileImage}
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
