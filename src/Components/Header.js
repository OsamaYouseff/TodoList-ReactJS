
/// material Ui components
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

/// others
import "./Header.css"

function getFullDate() {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
}

// Example usage:


export default function Header() {
    const fullDate = getFullDate();
    return (
        <header >
            <a href="#" > <TaskAltIcon />
                {/* title */}
                <Typography
                    sx={{ fontSize: "24px", fontWeight: 800, margin: 0 }}
                    variant="h1"
                    gutterBottom
                >
                    TodoList
                </Typography>
                {/* == title == */}
            </a>
            <ul >
                <li style={{ scale: "1.1" }}><SearchIcon /></li>
                <li> <CalendarMonthIcon />
                    <span style={{ fontSize: "15px" }} id="today-date">{fullDate}</span>
                </li>
                <li><NotificationsActiveIcon /></li>
                <li><AccountCircleIcon /></li>
            </ul>
        </header >
    )
}