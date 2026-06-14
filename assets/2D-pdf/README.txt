2D drawing PDFs
===============
Each product page's drawing button looks for a file here named:

    W-<MODEL>_2D.pdf      e.g.  W-HTW-2170_2D.pdf, W-HTWL-3210_2D.pdf,
                                W-PCRL-42_2D.pdf, W-PLSH-206_2D.pdf

If the matching PDF exists, the button opens it. If not, the button sends
the visitor to the contact form with a pre-filled enquiry for that model.
(A fallback location assets/drawings/<MODEL>.pdf|png|jpg is also checked.)
