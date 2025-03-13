import { SignIn } from "@clerk/nextjs";

export default function Signin() {
    return (
        <div className="flex items-center justify-center h-[70vh] bg-gray-50 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-md w-full max-w-4xl">
                {/* Left section with app info */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome to AI PDF Summarizer</h2>
                    <p className="mt-4 text-gray-600">Effortlessly generate concise summaries of lengthy PDFs using cutting-edge AI technology. Sign up to get started!</p>
                </div>
                {/* Right section with sign-up form */}
                <div className="flex items-center justify-center">
                    <SignIn />
                </div>
            </div>
        </div>
    );
}
