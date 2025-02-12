import HighlightForm from "@/components/HighlightForm";

const Edit = () => {
    return (
        <div className="mt-[48px] w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-[65ch] p-4 rounded-xl bg-secondary text-secondary-foreground">
                <HighlightForm />
            </div>
        </div>
    );
};

export default Edit;
