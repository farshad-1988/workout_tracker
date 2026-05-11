import { Outlet, useParams, type Params } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

const MainLayout = () => {
  // const { pickedDate } = useParams<keyof Params>() as { pickedDate: string };
  // const [ModifiedPickedDate, setModifiedPickedDate] = useState<string>("");

  // useEffect(() => {
  //   if (!pickedDate)
  //     setModifiedPickedDate(
  //       new DateObject({
  //         calendar: persian,
  //         locale: persian_fa,
  //       }).format("YYYY-MM-DD"),
  //     );
  // }, [pickedDate]);

  return (
    <div className="w-full h-full ">
      <Navbar />
      <div className="w-full  flex items-center bg-transparent justify-center">
        <Outlet />
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default MainLayout;
