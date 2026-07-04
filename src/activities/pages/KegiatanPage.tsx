import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

import EventForm from "@/activities/components/kegiatanForm";
import EventTable from "@/activities/components/kegiatanTable";
import JadwalJumatPage from "@/activities/pages/JadwalSholatJumat";

import type { EventItem, EventStatus } from "@/activities/types/event";

const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Kajian Tafsir Jumat",
    date: "2026-05-20",
    location: "Aula Masjid",
    description: "Kajian rutin tafsir Al-Qur'an bersama ustadz.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Bakti Sosial Ramadhan",
    date: "2026-05-12",
    location: "Halaman Masjid",
    description: "Kegiatan berbagi sembako untuk masyarakat.",
    status: "ongoing",
  },
];

export default function KegiatanPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<"events" | "jumat">("events");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    status: "upcoming" as EventStatus,
  });

  const totalEvents = useMemo(() => events.length, [events]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function resetForm() {
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
      status: "upcoming",
    });

    setEditingId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.location) {
      return;
    }

    if (editingId) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingId
            ? {
                ...event,
                ...formData,
              }
            : event
        )
      );
    } else {
      const newEvent: EventItem = {
        id: Date.now(),
        ...formData,
      };

      setEvents((prev) => [newEvent, ...prev]);
    }

    resetForm();
  }

  function handleEdit(event: EventItem) {
    setEditingId(event.id);

    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      status: event.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete(id: number) {
    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );
  }

  function handleStatusChange(
    id: number,
    status: EventStatus
  ) {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              status,
            }
          : event
      )
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            className="text-2xl font-bold text-gray-900 dark:text-white"
            style={{ margin: 0 }}
          >
            Manajemen Kegiatan
          </h2>

          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            Kelola seluruh kegiatan masjid dari dashboard admin.
          </p>
        </div>

        <Card className="px-5 py-3 shadow-sm border border-emerald-100 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            Total Kegiatan
          </p>

          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
            {totalEvents}
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700 pb-3">
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "events"
              ? "bg-emerald-600 text-white"
              : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          Kegiatan Masjid
        </button>

        <button
          onClick={() => setActiveTab("jumat")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "jumat"
              ? "bg-emerald-600 text-white"
              : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          Jadwal Jumat
        </button>
      </div>

      {/* Content */}
      {activeTab === "events" && (
        <>
          <EventForm
            editingId={editingId}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
          />

          <EventTable
            events={events}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />
        </>
      )}

      {activeTab === "jumat" && (
        <JadwalJumatPage />
      )}
    </div>
  );
}