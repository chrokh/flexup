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
([A-Za-z]+)     return 'TAG'
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
    : expr EOF
        {return $1.split(','); }
    ;

expr
    : term
        { $$ = String($1); }
    | term expr
        { $$ = String($1) + ',' + $2; }
    ;

term
    : TAG   { $$ = String($1); }
    | TEXT  { $$ = String($1); }
    | OPEN  { $$ = String($1); }
    | CLOSE { $$ = String($1); }
    ;

