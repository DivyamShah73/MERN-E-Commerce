import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2 animate-fade-in">
          Welcome back
        </h1>
        <p className="text-base text-gray-600 mb-4">
          Don't have an account?
          <Link
  className="ml-2 inline-block rounded-full bg-black text-white px-3 py-1 text-sm font-medium shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200"
  to="/auth/register"
>
  Create an account
</Link>

        </p>
      </div>
      <div className="mt-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/40 animate-fade-in-up relative overflow-hidden">
        {/* Glass shine effect */}
        <div className="pointer-events-none absolute -top-1/4 left-1/2 w-2/3 h-1/2 bg-gradient-to-r from-white/60 to-transparent rounded-full blur-2xl opacity-40 -translate-x-1/2"></div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white/80 hover:bg-black hover:text-white hover:shadow-lg transition-all duration-200 font-semibold text-black shadow-sm py-2 rounded-lg"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white/80 hover:bg-[#ea4335] hover:text-white hover:shadow-lg transition-all duration-200 font-semibold text-black shadow-sm py-2 rounded-lg"
            >
              <Mail className="h-5 w-5" />
              <span>Google</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AuthLogin;
