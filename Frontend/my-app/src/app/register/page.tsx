import RegisterForm from "./register-form";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg">
                <RegisterForm />
            </div>
        </main>
    );
}