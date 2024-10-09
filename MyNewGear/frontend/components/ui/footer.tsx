export default function Footer() {
  return (
    <footer className="bg-white py-6">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <CaravanIcon className="h-6 w-6" />
          <span className="font-bold text-primary">Campify</span>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; 2024 Campify. All rights reserved.
        </div>
      </div>
    </footer>
  );
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
  );
}
