export const WorkOrderDetails = () => {
    const { id } = useParams();
    const [workOrder, setWorkOrder] = useState(null);
  
    useEffect(() => {
      const fetchWorkOrderDetails = async () => {
        try {
          const data = await getWorkOrderDetails(id);
          setWorkOrder(data);
        } catch (error) {
          console.error("Error fetching work order details:", error);
        }
      };
  
      fetchWorkOrderDetails();
    }, [id]);
  
    if (!workOrder) return <div>Loading...</div>;
  
    return (
      <div>
        <h1>{workOrder.service_type}</h1>
        <p>{workOrder.description}</p>
        {workOrder.profile_image && (
          <img src={workOrder.profile_image} alt="Profile" />
        )}
        {/* Display other work order details */}
      </div>
    );
  };
  