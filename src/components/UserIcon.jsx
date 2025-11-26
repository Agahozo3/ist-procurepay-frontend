import React from "react";
import { User, Edit2 } from "lucide-react";

export default function UserIcon() {
  return (
    <div className="relative flex justify-center mb-6">
      <div className="w-24 h-24 rounded-full border-2 border-blue-400 p-1 bg-white flex items-center justify-center">
        <User className="w-16 h-16 text-blue-400" />
      </div>
      <div className="absolute bottom-0 right-0 bg-blue-400 rounded-full p-1 cursor-pointer">
        <Edit2 className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}