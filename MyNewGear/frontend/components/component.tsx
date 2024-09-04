/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/yZRdUeFCj5f
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { IBM_Plex_Sans } from 'next/font/google'
import { Chivo } from 'next/font/google'

ibm_plex_sans({
  subsets: ['latin'],
  display: 'swap',
})

chivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Component() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 font-bold text-primary" prefetch={false}>
            <CaravanIcon className="h-6 w-6" />
            <span>Campify</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              List Your Gear
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card shadow-lg rounded-lg">
                <DropdownMenuLabel className="text-primary font-medium">John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-muted transition-colors">My Listings</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted transition-colors">Settings</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-muted transition-colors">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
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
              <h3 className="text-xl font-bold text-primary">Ultralight Backpacking Tent</h3>
              <p className="text-muted-foreground">Compact and durable 2-person tent for your next adventure.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">Outdoor Enthusiast</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.8</span>
                </div>
              </div>
            </div>
          </div>
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
              <h3 className="text-xl font-bold text-primary">Compact Camping Cookset</h3>
              <p className="text-muted-foreground">Lightweight and versatile cookware for your outdoor adventures.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">Outdoor Chef</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.6</span>
                </div>
              </div>
            </div>
          </div>
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
              <h3 className="text-xl font-bold text-primary">Deluxe Sleeping Bag</h3>
              <p className="text-muted-foreground">Warm and cozy sleeping bag for cold-weather camping.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">Sarah Anderson</div>
                    <div className="text-sm text-muted-foreground">Outdoor Adventurer</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.9</span>
                </div>
              </div>
            </div>
          </div>
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
              <h3 className="text-xl font-bold text-primary">Portable Camp Stove</h3>
              <p className="text-muted-foreground">Compact and efficient stove for your outdoor cooking needs.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
                    <AvatarFallback>LW</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">Lisa Williams</div>
                    <div className="text-sm text-muted-foreground">Camping Enthusiast</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.7</span>
                </div>
              </div>
            </div>
          </div>
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
              <h3 className="text-xl font-bold text-primary">Ultralight Backpack</h3>
              <p className="text-muted-foreground">Durable and comfortable backpack for your next hiking adventure.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">John Doe</div>
                    <div className="text-sm text-muted-foreground">Outdoor Enthusiast</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.8</span>
                </div>
              </div>
            </div>
          </div>
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
              <h3 className="text-xl font-bold text-primary">Inflatable Sleeping Pad</h3>
              <p className="text-muted-foreground">Comfortable and compact sleeping pad for your camping trips.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Seller Avatar" />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-primary">Emily Martinez</div>
                    <div className="text-sm text-muted-foreground">Outdoor Adventurer</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-[#e1306c]" />
                  <span className="text-[#e1306c]">4.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white py-6">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <CaravanIcon className="h-6 w-6" />
            <span className="font-bold text-primary">Campify</span>
          </div>
          <div className="text-sm text-muted-foreground">&copy; 2024 Campify. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

function CaravanIcon(props) {
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
      <rect width="4" height="4" x="2" y="9" />
      <rect width="4" height="10" x="10" y="9" />
      <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
      <circle cx="8" cy="19" r="2" />
      <path d="M10 19h12v-2" />
    </svg>
  )
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
  )
}
