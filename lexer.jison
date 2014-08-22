/* description: Currently just testing different stuff. */
/* run at:      http://zaach.github.io/jison/try/       */

/* lexical grammar */
%lex
%%

\s+             /* skip whitespace */
\([A-Za-z]+\)   return 'OPEN'
\(\/[A-Za-z]+\) return 'CLOSE'
"**"            return 'TAG'
"--"            return 'TAG'
"-"             return 'TAG'
([A-Za-z]+)     return 'TEXT'
<<EOF>>         return 'EOF'

/lex



/* operator associations and precedence */
/*
%left TEXT
%left BOLD
*/


%start file

%% /* language grammar */

file
    : statements EOF
        {return $1.split(','); }
    ;

statements
    : expr            { $$ = String($1); }
    | expr statements { $$ = String($1) + ',' + $2; }
    ;

expr
    : text { $$ = String($1); }
    | elem { $$ = $1 ; }
    | tag { $$ = $1 ; }
    ;

elem
    : open statements close { $$ = $1 + ',' + $2 + ',' + $3; }
    | open close { $$ = $1 + ',' + $2; }
    ;

open  : OPEN   { $$ = String($1); };
close : CLOSE  { $$ = String($1); };
text  : TEXT   { $$ = String($1); };
tag   : TAG    { $$ = String($1); };

