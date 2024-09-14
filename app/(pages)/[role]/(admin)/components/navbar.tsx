import { usePathname } from "next/navigation";
import notificationStatus from "/public/images/notification-status.png";
import Link from "next/link";
import Image from "next/image";

const NavBar = ({ currentPath }: { currentPath: string }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Split the current path into individual segments
  const pathSegments = currentPath.split("/").filter(Boolean); // Filter removes empty strings

  // Generate breadcrumb links
  const generateBreadcrumbs = () => {
    let cumulativePath = ""; // Used to build each segment's full path

    return pathSegments.map((segment, index) => {
      cumulativePath += `/${segment}`; // Build full path up to the current segment

      return (
        <span key={index} className="flex items-center">
          {/* Set the color of '/' to gray */}
          <span className="mx-1 mr-2 text-xl text-gray-400 font-light">/</span>
          <Link href={cumulativePath} className={isActive(cumulativePath) ? "text-blue-500" : ""}>
            {segment}
          </Link>
        </span>
      );
    });
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-6 border-b shadow-sm">
      <div className="text-2xl font-semibold flex gap-4">
        <Link href="/admin" className={isActive("/admin") ? "text-blue-500" : ""}>
          Dashboard
        </Link>
        {currentPath && generateBreadcrumbs()}
      </div>
      <div className="flex items-center gap-4">
        <Image className="scale-95" src={notificationStatus} alt="notification" />
      </div>
    </div>
  );
};

export default NavBar;
