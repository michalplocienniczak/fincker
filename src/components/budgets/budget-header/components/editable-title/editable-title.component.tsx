"use client"
import React, { useState } from "react"
import { EditBudgetTitleForm } from "./components"
import { PencilLine } from "lucide-react"

type EditableTitleProps = {
  name: string
}

const EditableTitle = ({ name }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false)

  return isEditing ? (
    <EditBudgetTitleForm name={name} onClose={() => setIsEditing(false)} />
  ) : (
    <h1 className="text-2xl group flex gap-2 items-center cursor-pointer" onClick={() => setIsEditing(true)}>
      {name} <PencilLine className="group-hover:block hidden w-5 h-5" />
    </h1>
  )
}

export default EditableTitle
