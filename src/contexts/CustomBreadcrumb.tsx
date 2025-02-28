
import { pageRoutes } from '@/components/routes';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BreadcrumbsRoute, getBreadcrumbs } from 'use-react-router-breadcrumbs';
import { useLocation } from 'react-router'
export interface ICustomBreadcrumbRoute {
    path?: string;
    breadcrumb?: string | null;
}   
interface ICustomBreadcrumb {
    customBreadcrumbs: ICustomBreadcrumbRoute[];
    setCustomBreadcrumbs: (breadcrumbs: ICustomBreadcrumbRoute[]) => void;
    addBreadcrumbRule: (breadcrumb:ICustomBreadcrumbRoute) => void;
}
// Create a context
const CustomBreadcrumbContext = createContext<ICustomBreadcrumb | null>(null);

const PREFIX = process.env.PREFIX;
const PREFIX_ADMIN = process.env.PREFIX_ADMIN;
const initBreadcrumbTreeData:ICustomBreadcrumbRoute[]=[
    // { path: '/student-workspace-v3/distributor/8', breadcrumb: '5T3MM' },
    { path: '', breadcrumb: null  },
    { path: PREFIX, breadcrumb: null  },

    { path: `${PREFIX_ADMIN}/workshop-management`, breadcrumb: 'Workshop Management'  },
    { path: `${PREFIX_ADMIN}/workshop-management/create`, breadcrumb: 'Create'  },
    { path: `${PREFIX_ADMIN}/workshop-management/:id`, breadcrumb: 'Detail'  },
    
]
const normalizePath=(path:string)=>{
    return "/"+path.replace(/^\/+/g,"");
}
// Create a provider component
export const CustomBreadcrumbProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [routeToDisplay,setRouteToDisplay] = useState<ICustomBreadcrumbRoute[]>([]);
    const [customBreadcrumbs,setCustomBreadcrumbs] = useState<ICustomBreadcrumbRoute[]>( []); 
    const [runtimeRules,setRuntimeRules] = useState<ICustomBreadcrumbRoute[]>([]);
    const [breadcrumbsTree,setBreadcrumbsTree] = useState<ICustomBreadcrumbRoute[]>(initBreadcrumbTreeData.map((breadcrumb)=>{
        return {
            ...breadcrumb,
            path: normalizePath(breadcrumb.path||"/")
        }
    }));
    
    // const [location,setLocation] = useState<string>("");
    const location = useLocation();
  
  
      const addBreadcrumbRule=(breadcrumb:ICustomBreadcrumbRoute)=>{
        // add to breadcrumb tree if path not exist
        if(runtimeRules.find((rule)=>rule.path===breadcrumb.path)){
            return;
        }
        var newRuntimeRules=([breadcrumb,...runtimeRules]);
        setRuntimeRules(newRuntimeRules.map((rule)=>{
            return {
                ...rule,
                path: normalizePath(rule.path||"/")
            }
        }));
        console.log("newRuntimeRules",newRuntimeRules);
      }


      const updateBreadcrumb=()=>{
        
        var mapBreadcrumbsTree=breadcrumbsTree.map((breadcrumb)=>{
            // add prefix "/" to all routes
            breadcrumb.path = normalizePath(breadcrumb?.path||"/");
            return breadcrumb;
          });
          const breadcrumbs = getBreadcrumbs({
            routes: mapBreadcrumbsTree,
            location: {pathname:window.location.pathname} as any
            
          });
          
          var b2=breadcrumbs.filter((breadcrumb) => breadcrumb.match);
         
          const routesDisplay=b2.map((breadcrumb) => {
            // finf path in runtimeRules
            var path=runtimeRules.find((rule)=>rule.path===breadcrumb.key);
            return {
                path: `${breadcrumb.match.pathname}`,
                breadcrumb: path?.breadcrumb || breadcrumb.match.route?.breadcrumb
            };
          }).filter((breadcrumb)=>breadcrumb.breadcrumb);
          console.log("routesDisplay",routesDisplay,breadcrumbsTree);
          setCustomBreadcrumbs(routesDisplay as ICustomBreadcrumbRoute[]);
          
      }
    
   
      

      useEffect(()=>{
        updateBreadcrumb();
        
        // setLocation(window.location.pathname);
      },[location,breadcrumbsTree,runtimeRules])
      
      
    return (
        <CustomBreadcrumbContext.Provider value={{ customBreadcrumbs,setCustomBreadcrumbs ,addBreadcrumbRule}}>
            {children}
        </CustomBreadcrumbContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useCustomBreadcrumb = () => {
    const context = useContext(CustomBreadcrumbContext);
    if (!context) {
        throw new Error('useCustomBreadcrumb must be used within a CustomBreadcrumbProvider');
    }
    return context;
};