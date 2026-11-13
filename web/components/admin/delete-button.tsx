"use client";

export function DeleteButton({ title }: { title: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) e.preventDefault();
      }}
      className="text-sm text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}
