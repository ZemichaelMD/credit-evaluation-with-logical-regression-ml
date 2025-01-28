import { Card, CardContent, CardFooter } from "./ui/Card";

export default function Footer() {

  return (
    <footer className="mt-auto m-10">
      <Card className="w-full bg-background dark:bg-background">
        <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">About the Project</h3>
            <p className="text-muted-foreground dark:text-gray-400 font-light">
              A full stack web application that allows users to evaluate the creditworthiness of a potential customer. It includes a feature that trains machine learning model that predicts the creditworthiness of a customer based on their credit history, and a feature that allows users to use that model to evaluate the creditworthiness based on parameters provided by the user.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Team</h3>
            <ul className="space-y-2 text-muted-foreground dark:text-gray-400 font-light">
              <li className="flex items-center justify-between">
                <span>Bemnet Tekalgn</span>
                <span className="text-sm text-muted-foreground">GSE-1559-16</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Nathnael Tesfaye</span>
                <span className="text-sm text-muted-foreground">GSE-6890-16</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Yewebemert Teshome</span>
                <span className="text-sm text-muted-foreground">GSE-5985-16</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Zemichael Mehretu</span>
                <span className="text-sm text-muted-foreground">GSE-2606-06</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/ZemichaelMD/credit-evaluation-with-logical-regression-ml" 
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
            © {new Date().getFullYear()} Credit Evaluation with Logical Regression. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </footer>
  );
}
