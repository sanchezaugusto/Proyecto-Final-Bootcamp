"use client";

export default function Footer() {
  return (
    <footer className="flex justify-center w-full h-32 bg-black">
      <div className="w-[1200px] flex justify-between items-center">
        <div>
          <a href="http://localhost:3000/">
            <img 
              src={"/logo2.png"} 
              alt="Logo" 
              width={50} 
              height={50} 
              className="rounded-full" 
            />
          </a>
        </div>

        <div className="text-sm text-white flex flex-col gap-1">
          <p
            className="cursor-pointer hover:text-gray-300"
            onClick={() => {
              window.location.href = "https://vinorium.com";
            }}
          >
            Vinorium.com
          </p>
        </div>
      </div>
    </footer>
  );
}
