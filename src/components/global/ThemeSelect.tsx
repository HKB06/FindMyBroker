import { useTheme } from "../../app/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
export function ThemeSelect() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="md:w-1/3 flex justify-end items-center gap-4 text-black dark:text-white">
            <Sun width={18} height={18} />

            <Switch
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme} 
                className="cursor-pointer dark:bg-green-light!"
            />
            
            <Moon size={18} />
        </div>
    );

}