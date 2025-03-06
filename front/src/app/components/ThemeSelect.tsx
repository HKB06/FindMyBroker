import { useTheme } from "../providers/ThemeProvider";
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
export function ThemeSelect() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="w-1/3 flex justify-end items-center gap-4 text-black dark:text-white">
            <Sun size={18} />

            <Switch
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme} 
                className="cursor-pointer dark:bg-[#1F2937]!"
            />
            
            <Moon size={18} />
        </div>
    );

}