

export interface ModalDialog {
    title: string;
    /// Html to display in the dialog's body.
    /// Can contain any html, but be sure to escape any values input by user.
    /// Cannot contain angular bindings.
    bodyHTML: string;
}

