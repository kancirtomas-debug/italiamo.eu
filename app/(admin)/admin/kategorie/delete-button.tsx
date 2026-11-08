"use client";

export function DeleteCategoryButton({ name }: { name: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(`Naozaj vymazať kategóriu „${name}"?`)) e.preventDefault();
      }}
      className="h-9 px-3 rounded-md border border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50 transition-colors"
    >
      Vymazať
    </button>
  );
}
