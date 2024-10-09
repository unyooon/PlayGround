import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Component() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Gear</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Gear Image"
              width={600}
              height={400}
              className="h-64 w-full object-cover transition-all group-hover:scale-105"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
            <div className="bg-card p-4 shadow-md">
              <h3 className="text-xl font-bold text-primary">
                Ultralight Backpacking Tent
              </h3>
              <p className="text-muted-foreground">
                Compact and durable 2-person tent for your next adventure.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="Seller Avatar"
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">
                      Outdoor Enthusiast
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.8</span>
                </div>
              </div>
            </div>
          </div>
          {/* Other gear items go here */}
        </div>
      </main>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
