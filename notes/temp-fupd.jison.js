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
        {
            var bnf = {};

            //$1.forEach(function(){
            //    bnf[Math.random()] = Math.random();
            //});

            var ret = {
                lex: $1,
                bnf: bnf
            };

            console.log(JSON.stringify(ret, null, 4));
            return ret;
        }
    ;

statements
    : expr            { $$ = [$1]; }
    | expr statements %{
        console.log("1", typeof $1[0]);
        if(typeof $1[0] == 'object'){
            $$ = [$1[0], $1[1], $2];
            console.log($$);
        }
        else
            $$ = [$1, $2];

        // add tail
        /*$2.forEach(function(e, i){
            if(typeof e[0] != 'object')
                res.push(e);
            else{
                res.push(e[0]);
                res.push(e[1]);
            }*/

            //res.push(e);
            /*console.log("CHECK TYPE:" , e);
            if(typeof e != 'object'){
                res.push(e);
            }
            else{
                // flatten nested array
                res.push(e[0]);
                res.push(e[1]);
            }*/
        //});

        // check for duplicated patterns
        /*res.forEach(function(e, i){
            res.forEach(function(ee, ii){
                if(e !== ee)
                    if(e[0] == ee[0])
                        throw ("Parse error: Ambiguous use of '" + e[0] + "'");
            });
        });*/
        }%
    ;

expr
    : TEXT EQUALS PATTERN CAPTURE PATTERN
        %{
            if(String($3) == String($5))
                $$ = [ String($3), ('TAG-' + String($1)) ];
            else
                $$ = [
                        [ String($3), ('OPEN-' + String($1))  ] ,
                        [ String($5), ('CLOSE-' + String($1)) ]
                     ];
        }%
    ;



