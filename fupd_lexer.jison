/* description: Currently just testing different stuff. */
/* run at:      http://zaach.github.io/jison/try/       */

/* lexical grammar */
%lex
%%

\s+             /* skip whitespace */
":"             return 'EQUALS'
"%"             return 'CAPTURE'
[A-Za-z]+       return 'TEXT'
[A-Za-z*\/\\]+  return 'PATTERN'
<<EOF>>         return 'EOF'

/lex


%start file

%% /* language grammar */

file
    : statements EOF
        {return $1; }
    ;

statements
    : expr            { $$ = $1; }
    | expr statements { $$ = [$1, $2]; }
    ;

expr
    : TEXT EQUALS pattern
        { $$ = [ $3 ]; }
    ;

pattern
    : PATTERN CAPTURE PATTERN
        %{
            if(String($1) == String($3))
                $$ = [String($1), "return AMBIGIOUS"];
            else
                $$ = [(String($1) + ", return OPEN"), [String($3), "return CLOSE"]];
        }%
    ;



