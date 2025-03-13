export const Pricing = () => {
    return (
        <section className="py-8 bg-gray-50 sm:py-12 lg:py-28">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Subscription Plans</h2>
                    <p className="max-w-md mx-auto mt-4 text-base text-gray-600">Choose a plan that suits your AI-powered PDF summarization needs.</p>
                </div>

                <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 mt-12">
                    <div className="overflow-hidden bg-transparent border border-gray-200 rounded-lg">
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-black">Basic Plan</h3>
                            <p className="mt-2 text-sm text-gray-600">Ideal for individuals with occasional summarization needs.</p>

                            <div className="flex items-end mt-4">
                                <span className="text-lg font-medium text-black">$</span>
                                <p className="text-4xl font-medium">9</p>
                                <span className="ml-1 text-sm text-gray-600">/ month</span>
                            </div>

                            <button className="w-full px-3 py-2 mt-5 text-sm font-semibold text-gray-900 transition bg-transparent border rounded-lg border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer">
                                Start Free Trial
                            </button>

                            <ul className="mt-6 space-y-3 text-sm text-gray-600">
                                <li>✔️ 50 Summaries / month</li>
                                <li>✔️ Standard AI model</li>
                                <li>✔️ Email Support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white border border-transparent rounded-lg">
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-black">Pro Plan</h3>
                            <p className="mt-2 text-sm text-gray-600">Perfect for professionals and teams needing advanced summarization tools.</p>

                            <div className="flex items-end mt-4">
                                <span className="text-lg font-medium text-black">$</span>
                                <p className="text-4xl font-medium">29</p>
                                <span className="ml-1 text-sm text-gray-600">/ month</span>
                            </div>

                            <button className="w-full px-3 py-2 mt-5 text-sm font-semibold text-white transition border rounded-lg bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 cursor-pointer">
                                Start Free Trial
                            </button>

                            <ul className="mt-6 space-y-3 text-sm text-gray-600">
                                <li>✔️ Unlimited Summaries</li>
                                <li>✔️ Advanced AI model</li>
                                <li>✔️ Priority Support</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

