const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 text-primary font-mono text-sm animate-pulse">
          <span className="opacity-70">&gt;</span> Loading
        </div>
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
