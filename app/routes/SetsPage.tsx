import SetBanner from "~/components/SetBanner";

export default function SetsPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mb-6">Browse through all the sets</h2>
      <div>
        <SetBanner setTitle="test" />
      </div>
    </div>
  );
}
