import { Card, CardContent, CardFooter } from "./ui/Card";

export default function Footer() {

  return (
    <footer className="mt-auto m-10">
      <Card className="w-full bg-background dark:bg-background">
        <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">About the Project</h3>
            <p className="text-muted-foreground dark:text-gray-400 font-light">
              An innovative web application built with React and TailwindCSS, 
              focusing on creating seamless user experiences with modern design principles.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Team</h3>
            <ul className="space-y-2 text-muted-foreground dark:text-gray-400 font-light">
              <li>John Doe - Lead Developer</li>
              <li>Jane Smith - UI/UX Designer</li>
              <li>Alex Johnson - Frontend Developer</li>
              <li>Dr. Sarah Wilson - Project Instructor</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/yourusername/yourproject" 
                  className="text-primary hover:underline dark:text-primary-foreground font-light"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="border-t dark:border-gray-700 p-4">
          <p className="text-sm text-muted-foreground dark:text-gray-400 text-center w-full font-light">
            © {new Date().getFullYear()} Your Project Name. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </footer>
  );
}
