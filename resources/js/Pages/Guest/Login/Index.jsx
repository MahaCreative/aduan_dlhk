import ResponseAlert from "@/Hook/ResponseAlert";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Index() {
    const { showResponse } = ResponseAlert();
    const { profile } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {
                Swal.fire(
                    "success",
                    "Login Berhasil",
                    "anda berhasil login ke sistem"
                );
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal Login",
                    "ups, login gagal, periksa kembali isian anda"
                );
            },
        });
    };
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-4">
                {/* logo */}
                <div className="flex items-center mb-8">
                    <img
                        src={"/storage/" + profile.logo}
                        alt={profile.nama_instansi}
                        className="w-16 h-16 mr-2"
                    />
                </div>

                {/* card */}
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-center text-primary">
                        Login
                    </h1>
                    <p className="text-center text-primary/70 mt-1 mb-6">
                        Sign in to your account
                    </p>

                    <form onSubmit={submitHandler} className="space-y-4">
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                                required
                                className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                placeholder="you@example.com"
                            />
                            <p className="text-red-500 italic text-sm">
                                {errors.email}
                            </p>
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                required
                                className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* forgot password */}
                        {/* <div className="text-right">
                            <Link
                                // href={route("forgot_password")}
                                as="button"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div> */}

                        {/* submit */}
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-green-950 text-white font-semibold hover:opacity-90 transition"
                        >
                            Log In
                        </button>
                    </form>

                    {/* sign‑up link */}
                    <p className="mt-6 text-center text-sm">
                        Don’t have an account?{" "}
                        <Link
                            href={route("register")}
                            type="button"
                            className="font-semibold text-blue-700 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
