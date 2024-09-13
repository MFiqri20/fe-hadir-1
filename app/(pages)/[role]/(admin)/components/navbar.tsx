import { usePathname, useRouter } from "next/navigation";
import notificationStatus from "/public/images/notification-status.png";
import Link from "next/link";
import Image from "next/image";

// NavBar component update
const NavBar = ({ currentPath }: { currentPath: string }) => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
  
    return (
      <div className="w-full flex items-center justify-between px-6 py-6 border-b shadow-sm">
        {/* Navigation Links with dynamic coloring */}
        <div className="text-xl font-semibold flex gap-4">
          <Link href="/dashboard" className={isActive("/dashboard") ? "text-blue-500" : ""}>
            Dashboard
          </Link>
          {currentPath && (
            <>
              /
              <Link href={currentPath} className="text-blue-500">
                { currentPath.replace("/", " ")}
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Image className="scale-95" src={notificationStatus} alt="notification" />
        </div>
      </div>
    );
  };
  
export default NavBar