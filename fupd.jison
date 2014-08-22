/* description: Trying to parse fupd files. */
/* run at:      http://zaach.github.io/jison/try/       */

/* lexical grammar */
%lex
%%

\s+                /* skip whitespace */
":"                return 'EQUALS'
"%"                return 'CAPTURE'
[A-Za-z]+          return 'TEXT'
[A-Za-z0-9*\/\\]+  return 'PATTERN'
<<EOF>>            return 'EOF'

/lex


%start file

%% /* language grammar */



file
    : statements EOF
        { return $1; }
    ;

statements
    : expr            { $$ = [$1]; }
    | expr statements %{
        var head = $1,
            tail = $2,
            res  = [head];

        // add tail
        for(var i=0; i<$2.length; i++){
            res.push($2[i]);


            // check if token already used
            var existing = $2[i].tokens;
            for(var ii=0; ii<existing.length; ii++){

                var fresh = $1.tokens;
                for(var iii=0; iii<fresh.length; iii++){
                    if(existing[ii].token == fresh[iii].token)
                        throw ("Parse error: Ambiguous use of '" + existing[ii].token) + "'";
                }
            }
        }

        $$ = res;
        }%
    ;

expr
    : TEXT EQUALS pattern
        { $$ = { name: $1, tokens: $3}; }
    ;

pattern
    : PATTERN CAPTURE PATTERN
        %{
            if(String($1) == String($3))
                $$ = [{token: String($1), type: 'TAG'}];
            else
                $$ = [
                        {token: String($1), type: 'OPEN'},
                        {token: String($3), type: 'CLOSE'}
                     ];
        }%
    ;



