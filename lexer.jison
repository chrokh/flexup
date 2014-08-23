/* description: Currently just testing different stuff. */
/* run at:      http://zaach.github.io/jison/try/       */

/* lexical grammar */
%lex
%%

\s+             /* skip whitespace */
\([A-Za-z]+\)   return 'OPEN'
\(\/[A-Za-z]+\) return 'CLOSE'
"**"            return 'BOLD'
"--"            return 'EMPH'
([A-Za-z]+)     return 'TEXT'
<<EOF>>         return 'EOF'

/lex


%start file

%% /* language grammar */

file
    : statements EOF
        {return $1.split(','); };

statements
    : expr            { $$ = $1; }
    | expr statements { $$ = [$1, $2].join(','); };

expr
    : text       { $$ = $1; }
    | elem       { $$ = $1; }
    | pair-bold  { $$ = $1; };

elem
    : open statements close { $$ = [$1,$2,$3].join(','); }
    | open close { $$ = [$1,$2].join(','); };

pair-bold
    : bold non-bold-statements bold { $$ = [$1,$2,$3].join(','); };



/* non-bold */

non-bold-statements
    : non-bold-expr                     { $$ = $1; }
    | non-bold-expr non-bold-statements { $$ = [$1, $2].join(','); };

non-bold-expr
    : text            { $$ = $1; }
    | non-bold-elem   { $$ = $1; };

non-bold-elem
    : open non-bold-statements close { $$ = [$1,$2,$3].join(','); }
    | open close { $$ = [$1,$2].join(','); };



open  : OPEN   { $$ = String($1); };
close : CLOSE  { $$ = String($1); };
text  : TEXT   { $$ = String($1); };
bold  : BOLD   { $$ = String($1); };
