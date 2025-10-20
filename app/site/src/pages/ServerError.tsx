const ServerError = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">500</h1>
        <p className="mb-4 text-xl text-muted-foreground">Internal Server Error</p>
        <a 
          href="/" 
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ServerError;
