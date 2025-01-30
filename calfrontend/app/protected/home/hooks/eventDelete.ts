import { DELETE_EVENT } from "@/app/graphql/mutations";
import { useMutation } from "@apollo/client";

export const handleEventDelete = async (
    deleteEvent: any,
    selectedEvent: any,
    setSelectedEvent: any,
    setFormData: any,
    refetch: any
) => {
    

    try {
        await deleteEvent({ variables: { id: selectedEvent.id } });
        // alert("Event deleted successfully");
        setSelectedEvent(null);
        setFormData({ title: "", description: "", start: "", end: "" });
        await refetch();
    } catch (err) {
        console.error("Error deleting event:", err);
        alert("Failed to delete event");
    }
};