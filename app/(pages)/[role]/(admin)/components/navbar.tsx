import { usePathname } from "next/navigation";
import notificationStatus from "/public/images/notification-status.png";
import Link from "next/link";
import Image from "next/image";

const NavBar = ({ currentPath }: { currentPath: string }) => {
  const pathname: any = usePathname();

  // Split the current path into individual segments, excluding the leading '/'
  const pathSegments = currentPath
    .split("/")
    .filter(Boolean) // Filter removes empty strings
    .filter((segment) => segment !== "admin"); // Exclude 'admin' segment

  // Generate breadcrumb links
  const generateBreadcrumbs = () => {
    let cumulativePath = "/admin"; // Start with '/admin'

    return pathSegments.map((segment, index) => {
      cumulativePath += `/${segment}`; // Build full path up to the current segment

      return (
        <span key={index} className="flex items-center">
          {/* Set the color of '/' to gray */}
          <span className="mx-1 mr-2 text-xl text-gray-400 font-light">/</span>
          <Link
            href={cumulativePath}
            className={pathname === cumulativePath ? "text-blue-500" : ""}
          >
            {segment}
          </Link>
        </span>
      );
    });
  };

  // Determine if the 'Dashboard' link should be active
  const isDashboardActive =
    pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <div className="sticky top-0 left-0 right-0 px-6 py-6 border-b shadow-sm bg-white z-40 flex items-center justify-between">
      <div className="text-2xl font-semibold flex items-center gap-4">
        {/* 'Dashboard' link */}
        <Link
          href="/admin"
        >
          Dashboard
        </Link>
        {/* Display breadcrumbs only if currentPath has segments beyond 'admin' */}
        {pathSegments.length > 0 && generateBreadcrumbs()}
      </div>
      <div className="flex items-center">
        <Image
          className="scale-95"
          src={notificationStatus}
          alt="notification"
        />
      </div>
    </div>
  );
};

export default NavBar;
