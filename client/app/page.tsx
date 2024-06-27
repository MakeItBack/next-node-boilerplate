"use client";
import React, { useEffect, useState } from "react";
import { Issue } from "@/app/types";
import Popup from "@/app/popup";

export default function Home() {
  const [allIssues, setAllIssues] = useState<Issue[] | []>([]);
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<Issue | null>(null);
  const [updateData, setUpdateData] = useState("");

  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setId(e.target.value);
  };

  const handleUpdateChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setUpdateData(e.target.value);
  };

  const handleView = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/issues/${id}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/issues/${id}`, {
        method: "DELETE",
      });
      setData(null);
      alert("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/issues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updateData }),
      });
      const result = await response.json();
      setData(result);
      alert("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    try {
      fetch("http://localhost:8080/api/issues")
        .then((results) => results.json())
        .then((data) => {
          setAllIssues(data);
          console.log(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <h1 className="mb-8">App Name</h1>

        <h2 className="mb-4">Current Items</h2>
        <Popup />
        {allIssues && (
          <ul className="mb-8">
            {allIssues.map((issue) => (
              <li>
                [{issue.id}] - {issue.title}
              </li>
            ))}
          </ul>
        )}

        <h2>Manage Items</h2>
        <input type="text" value={id} onChange={handleInputChange} placeholder="Enter ID" />
        <button onClick={handleView}>View</button>

        <button onClick={handleDelete}>Delete</button>
        <div className="mb-12">
          <input
            type="text"
            value={updateData}
            onChange={handleUpdateChange}
            placeholder="Enter new title"
          />
          <input
            type="text"
            value={updateData}
            onChange={handleUpdateChange}
            placeholder="Enter new description"
          />
          <button onClick={handleUpdate}>Update</button>
        </div>

        {data && (
          <div>
            <h2 className="mb-4">Data for Issue #{id}</h2>
            {`${data.title} | ${data.description}`}
          </div>
        )}
      </div>
    </main>
  );
}
