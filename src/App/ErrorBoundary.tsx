import React, { Component, ReactNode } from "react";
import AppError from "./AppError";

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        error: null
    };

    public componentDidCatch(error: Error) {
        this.setState({ error });
    }

    public render() {
        if (this.state.error) {
            return <AppError error={this.state.error} />;
        }

        return this.props.children;
    }
}
