import { Switch, Grid, Button } from "antd";
import { useTheme } from "@/contexts/themeContext";
import { Moon, Sun } from "lucide-react";

const { useBreakpoint } = Grid;
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { md } = useBreakpoint();

    const handleChange = () => {
        toggleTheme();
    };
    return (
        // <Switch
        //     size={md ? "default" : "small"}
        //     onChange={handleChange}
        //     checkedChildren={<Moon />}
        //     unCheckedChildren={<Sun />}
        //     checked={theme === "light"}
        // />
          <Button
            onClick={toggleTheme}
            style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
            }}
            shape="circle"
            aria-label="Toggle theme"
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
    );
};

export default ThemeToggle;
